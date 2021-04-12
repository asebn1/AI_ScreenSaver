/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */


// tfjsWasm.setWasmPath('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@latest/dist/tfjs-backend-wasm.wasm');



const stats = new Stats();
stats.showPanel(0);
document.body.prepend(stats.domElement);

let model, ctx, videoWidth, videoHeight, video, canvas;
let face_frame_count;
face_frame_count = 0

const state = {
  backend: 'webgl'
};

// const gui = new dat.GUI();
// gui.add(state, 'backend', ['wasm', 'webgl', 'cpu']).onChange(async backend => {
//   await tf.setBackend(backend);
// });

async function setupCamera() {
  video = document.getElementById('video');

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': { facingMode: 'user' },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function AWS_req(img_byte){
  let element = document.getElementById('method');
  console.log(element.value)
  var rekognition = new AWS.Rekognition();
  var params = {
    CollectionId: "6jj2", 
    FaceMatchThreshold: 95, 
    Image: {
     Bytes : img_byte
    }, 
    MaxFaces: 5
   };
   rekognition.searchFacesByImage(params, function(err, data){
    if (err) {
      console.log(err, err.stack); // an error occurred
      alert("AWS Not configured. Check /pubilc/javascripts/aws_setup.js");
      window.location.href = '/';
    }
      
    else     console.log(data);           // successful response
    if (data.FaceMatches.length>0){
      post_data = {
        "result": true,
        "type" : element.value,
        "landing": "false"
      }
    }
    else{
      post_data = {
        "result": false,
        "type" : element.value,
        "landing": "false"
      }
      redirectPost("/use",post_data)
    }

    
    }
   )
   
} 

const renderPrediction = async () => {
  stats.begin();

  const returnTensors = false;
  const flipHorizontal = true;
  const annotateBoxes = true;
  const predictions = await model.estimateFaces(
    video, returnTensors, flipHorizontal, annotateBoxes);

  if (predictions.length > 0) {
    face_frame_count += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < predictions.length; i++) {
      if (returnTensors) {
        predictions[i].topLeft = predictions[i].topLeft.arraySync();
        predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        if (annotateBoxes) {
          predictions[i].landmarks = predictions[i].landmarks.arraySync();
        }
      }

      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      // console.log(start)
      // console.log(end)
      const size = [end[0] - start[0], end[1] - start[1]];
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      // ctx.fillRect(start[0], start[1], size[0], size[1]);

      if (annotateBoxes) {
        const landmarks = predictions[i].landmarks;

        ctx.fillStyle = "blue";
        for (let j = 0; j < landmarks.length; j++) {
          const x = landmarks[j][0];
          const y = landmarks[j][1];
          ctx.fillRect(x, y, 5, 5);
        }
      }
    }
  }

  stats.end();
  if(face_frame_count > 100){
    onClick()
    face_frame_count = 0
  }
  requestAnimationFrame(renderPrediction);
};
function onClick(){
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  var dataURL = canvas.toDataURL();
  enc_data = atob(dataURL.split("data:image/png;base64,")[1])
  // console.log(enc_data)
  var length = enc_data.length;
  imageBytes = new ArrayBuffer(length);
  var ua = new Uint8Array(imageBytes);
  for (var i = 0; i < length; i++) {
    ua[i] = enc_data.charCodeAt(i);
  }
  // console.log(ua)
  AWS_req(ua)

}
const setupPage = async () => {
  await tf.setBackend(state.backend);
  await setupCamera();
  video.play();

  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;

  canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

  model = await blazeface.load();

  renderPrediction();
};

function redirectPost(url, data) {
  var form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'post';
  form.action = url;
  for (var name in data) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = data[name];
      form.appendChild(input);
  }
  form.submit();
}

setupPage();
