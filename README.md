<h1>🌐 Full-Stack Web Application </h1>
Fullstack Web application that combines React (frontend) + Python (backend) + Sql (database) to manage db CRUD and other analysis.

<h2>🚀 Overview </h2>
This repository contains a full-stack web application that combines: <br>
🖥️ Frontend: Built with React and styled using Chakra UI. <br>
🖥️ Backend: Powered by Python Flask. <br>
🗄️ Database: Uses MySQL for data storage and management. <br>
<br>
<i>The application allows users to create and edit databases while maintaining access control through restricted grants.</i>

<h2>🏗️ Project Structure </h2>
📂 fullstack-repo <br>
├── 📂 fe  # Frontend (React + Chakra UI) <br>
│   ├── src <br>
│   ├── public <br>
│   ├── package.json <br>
│   └── ... <br>
├── 📂 be  # Backend (Python Flask) <br>
│   ├── app.py <br>
│   ├── requirements.txt <br>
│   ├── config.py <br>
│   └── ... <br>
└── 📂 db  # MySQL Database Configuration <br>

<h2> 🌍 Live Version </h2>
The full application is hosted online, allowing users to access and interact with the platform with limited permissions.

<h2>🔄 Clone & Run Locally </h2>
If you want to explore the project in depth, you can clone this repository and run it locally: <br>
🛠️ Setup <br>
1️⃣ Clone the Repository <br>
git clone https://github.com/gobbez/WebQueryTables.git <br> 
<br>
2️⃣ Setup Backend (Flask) <br>
cd be <br>
pip install -r requirements.txt <br>
python app.py <br>
<br>
3️⃣ Setup Frontend (React) <br>
cd ../fe <br>
npm create vite@latest <br>
npm install <br>
npm i @chakra-ui/react @emotion/react <br>
npx @chakra-ui/cli snippet add <br>
npm run dev <br>
(more details on <a href="https://www.chakra-ui.com/docs/get-started/installation">Chakra React</a>)

<h2>🎯 Features</h2>
📌 User Authentication (limited access online, full access locally) <br>
🔄 CRUD Operations on databases <br>
🌐 Modern UI built with Chakra UI <br>
⚡ Fast & Scalable backend with Flask <br>
🤝 Contributing <br>
<br>
My online version is hosted on Pythonanywhere for backend and vercel for frontend <br><br>
<i>Pull requests are welcome! Feel free to fork this repo and contribute improvements. <br>
Happy coding! 🚀</i>
