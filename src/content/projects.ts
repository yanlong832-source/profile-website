import type {Project} from "../types";
export const projects:Project[]=[
 {name:"Sub2API",summary:"多模型 API 代理与配额管理平台",description:"把多家模型服务统一成清晰、可观测、可扩展的接口，降低团队接入 AI 的成本。",status:"online",tags:["AI Infrastructure","API Gateway"],stack:["Go","Redis","Docker","Nginx"],url:"https://sub2api.yangzx1.xyz",repository:"https://github.com/yanlong832-source",accent:"mint",metrics:[{label:"可用性",value:"99.98%"},{label:"响应",value:"42ms"}]},
 {name:"Profile Website",summary:"面向技术展示的个人主页",description:"用 React 和 Vite 展示项目、技术能力与开源实践，并通过 GitHub Pages 自动发布。",status:"online",tags:["Frontend","Portfolio"],stack:["React","Vite","GitHub Pages"],url:"https://profile.yangzx1.xyz",repository:"https://github.com/yanlong832-source/profile-website",accent:"lilac",metrics:[{label:"部署",value:"自动化"},{label:"页面",value:"响应式"}]},
 {name:"Pulse Monitor",summary:"轻量级服务监控与故障定位面板",description:"将请求延迟、错误率和服务状态组织成一张容易阅读的运行视图。",status:"building",tags:["Observability","Platform"],stack:["Python","FastAPI","Prometheus"],repository:"https://github.com/yanlong832-source",accent:"sky",metrics:[{label:"指标",value:"实时"},{label:"告警",value:"可配置"}]}
];
