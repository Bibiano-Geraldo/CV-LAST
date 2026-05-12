import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Permite acesso ao servidor de dev a partir de IPs da LAN (telemóvel,
  // outro PC na rede, ou DevTools com device emulation a apontar para o
  // IP da máquina). Sem isto, o Next 15+ bloqueia RSC / HMR / Server
  // Actions vindos de origens diferentes de localhost, e a página fica
  // servida em SSR mas não hidrata — botões deixam de responder.
  allowedDevOrigins: [
    "192.168.9.125",
    "192.168.9.*",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
  ],
};

export default config;
