import type {Project} from "../types";

export const skills = {
  Languages: [["Go / Golang", 95], ["Java", 90], ["Python", 85], ["Node.js / TS", 80]],
  Infrastructure: [["PostgreSQL", 90], ["Redis", 95], ["Docker / K8s", 85], ["Linux & Nginx", 90]],
  "AI & LLM": [["LLM Integration", 85], ["RAG Architectures", 80], ["LangChain Agents", 75], ["API Gateways", 90]],
};

export const projects: Project[] = [
  {name:"Sub2API",summary:"多模型 API 代理与配额管理平台",description:"把多家模型服务统一成清晰、可观测、可扩展的接口，降低团队接入 AI 的成本。",status:"online",tags:["AI 基础设施","API 网关"],stack:["Go","Redis","Docker","Nginx"],url:"https://sub2api.yangzx1.xyz",repository:"https://github.com/yanlong832-source",accent:"mint",metrics:[{label:"可用性",value:"99.98%"},{label:"响应",value:"42ms"}]},
];
