Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell -WindowStyle Hidden -Command ""cd 'd:\SDE-90 Bootcamp\PROJECTS\Hiremind\backend'; C:\maven\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run""", 0, False
WshShell.Run "powershell -WindowStyle Hidden -Command ""cd 'd:\SDE-90 Bootcamp\PROJECTS\Hiremind\frontend'; npm run dev""", 0, False
