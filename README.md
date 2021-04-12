# AI Screen Saver
## AI 화면보호기 : 비인가 사용자로부터 PC 정보보호
![1](https://user-images.githubusercontent.com/57438644/100651272-926b3380-3388-11eb-870e-f0ccc900c999.png)

# 프로젝트 목적
 IBM 조사에 따르면 모든 정보 유출사고의 무려 60%는 내부자에 의해 발생되며 그 중 75%는 악의로 인한 것이라 한다. 
이에따라 내부자에 대한 인가자, 비인가자 구분이 요구되며 내부 관계자에 대한 보안 필요성이 증대되었다.
 사용자에게 웹 UI를 제공하여 편리성을 제공하고 인가 사용자를 등록할 수 있으며 비인가 사용자 위험을 감지할 수 있다. 또한 사용자의 선택에 따라 다른 화면 전환 기능을 제공한다. Yolov4, darknet을 통해 사람 및 사람얼굴을 인식 후 값을 파이썬으로 전달받아 아마존 레코그니션의 학습시킨 컬렉션과 비교한다. 이러한 프로그램 실행, 인가 사용자 등록, 기능 설정 등과 같은 동작은 nodejs express를 통해 사용자에게 웹 UI가 제공되어 사용자는 편리하게 프로그램을 사용할 수 있다.
 
# Built With
- [Nodejs v14.15.1](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [Python3](https://www.python.org/downloads/)
- [YOLOv4](https://github.com/Tianxiaomo/pytorch-YOLOv4)
- [Darknet](https://github.com/pjreddie/darknet)
- [Amazon Rekognition](https://aws.amazon.com/ko/free/machine-learning/?trk=ps_a134p000006gGh6AAE&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=Google&sc_category=Machine%20Learning&sc_country=KR&sc_geo=APAC&sc_outcome=acq&sc_detail=aws%20facial%20recognition&sc_content=Facial%20Recognition_e&sc_matchtype=e&sc_segment=477202630056&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Machine%20Learning|Solution|KR|EN|Text&s_kwcid=AL!4422!3!477202630056!e!!g!!aws%20facial%20recognition&ef_id=Cj0KCQiAzZL-BRDnARIsAPCJs72Uu_Iat-5C20ve4ITu4seo-Z4DXXMvSZYgcbpgO3GYG1c6ayI0ZdUaAnLSEALw_wcB:G:s&s_kwcid=AL!4422!3!477202630056!e!!g!!aws%20facial%20recognition)

## Run screen
![2](https://user-images.githubusercontent.com/57438644/100651286-95662400-3388-11eb-8f32-fc6bdf88282b.png)

# 제공기능
1. 사용자에게 웹 UI를 통한 편리성 제공
2. 인가 사용자 등록 기능
3. 비인가 사용자 위험 감지
4. 화면 전환 기능 (사용자 선택가능)
	- 윈도우 잠금
	- 바탕화면 이동

# 기대효과
- PC 보안성 향상
- 비인가 사용 차단

# Member
**Project Member**
- 공재호([asebn1](https://github.com/asebn1))
- 이민호([yeemh](https://github.com/yeemh))
- 이승민([effectivemadness](https://github.com/effectivemadness))

