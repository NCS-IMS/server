module.exports = {
    apps: [
        {
            name: 'emergency',
            script: './Emergency_Control_Server/dist/app.js',
            instances: 1, //실행할 클러스터 갯수
            exec_mode: `cluster`
        },
        {
            name: 'main',
            script: './Main_Server/dist/app.js',
            instances: 1, //실행할 클러스터 갯수
            exec_mode: `cluster`
        }
    ]
  }
  
// pm2 start ecosystem.config.js
