import { Service } from 'node-windows';

const svc = new Service({
  name: 'Ngrok Tunnel Service',
  description: 'Tunneling service for ngrok.',
  script: "C:\\ProgramData\\chocolatey\\bin\\ngrok.exe tunnel --label edge=edghts_2bbo0Oq3gTBwYH3SNsWacbFsiFV http://localhost:80"
});
svc.on('install', () => {
  svc.start();
});
svc.install();
