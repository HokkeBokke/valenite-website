import { Service } from 'node-windows';

const svc = new Service({
  name: 'Dating Node.js Server',
  description: 'My dating Node.js server as a Windows service.',
  script: 'C:\\Users\\Haako\\Documents\\Coding\\valenite-website\\server.js'
});
svc.on('install', () => {
  svc.start();
});
svc.install();
