import os
import sys
import pyautogui
import time
# print(len(sys.argv))                                                                 
# print(sys.argv[0])


if sys.argv[1] == "Logout":
    os.system("rundll32 user32.dll LockWorkStation")
elif sys.argv[1] == "Desktop":
    pyautogui.keyDown("win")
    pyautogui.keyDown('d')
    time.sleep(0.5)
    pyautogui.keyUp("win")
    pyautogui.keyUp('d')
elif sys.argv[1] == "NewDesktop":
    pyautogui.keyDown("win")
    pyautogui.keyDown('ctrl')
    pyautogui.keyDown('right')
    time.sleep(0.5)
    pyautogui.keyUp("win")
    pyautogui.keyUp('ctrl')
    pyautogui.keyUp('right')
