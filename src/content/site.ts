import type {Project} from "../types";

export const skills = {
  "编程语言": [
    {name: "Go / Golang", level: "深入掌握", details: "理解 goroutine、channel、context 取消链路、逃逸分析与 pprof；能够设计并发安全、可观测的服务。"},
    {name: "Java", level: "深入掌握", details: "掌握 JVM 内存模型、并发工具、GC 调优与 Spring 事务边界，能够定位线上性能和线程问题。"},
    {name: "Python", level: "熟练应用", details: "掌握异步 IO、类型标注、数据处理和测试工具，适合快速构建 AI 服务、自动化脚本与分析任务。"},
    {name: "Node.js / TypeScript", level: "熟练应用", details: "掌握事件循环、Promise 调度、类型系统与模块化工程，能够构建稳定的 BFF 和 API 服务。"},
  ],
  "框架与基础设施": [
    {name: "Spring / Gin", level: "深入掌握", details: "掌握中间件链路、依赖注入、路由设计、错误处理和服务拆分，能够落地清晰的后端接口边界。"},
    {name: "PostgreSQL", level: "深入掌握", details: "掌握索引设计、事务隔离、执行计划、锁等待与慢查询优化，能够设计可演进的数据模型。"},
    {name: "Redis", level: "深入掌握", details: "掌握缓存一致性、分布式锁、Stream、Lua 原子操作和持久化策略，能够处理高并发读写场景。"},
    {name: "Docker / Kubernetes", level: "熟练应用", details: "掌握镜像分层、健康检查、滚动发布、资源限制和服务编排，能够维护可重复的部署环境。"},
    {name: "Linux / Nginx", level: "熟练应用", details: "掌握进程与网络排障、反向代理、TLS、日志轮转和基础性能分析，能够独立维护线上入口。"},
  ],
  "AI 与大模型": [
    {name: "LLM API 集成", level: "熟练应用", details: "掌握流式输出、上下文管理、重试退避、限流计费和多模型路由，能够构建可靠的模型调用层。"},
    {name: "RAG 架构", level: "熟练应用", details: "理解切分、向量检索、重排、引用溯源与召回评估，能够围绕业务知识构建可验证的检索链路。"},
    {name: "Agent 工作流", level: "掌握实践", details: "掌握工具调用、状态管理、规划循环和失败恢复，能够把模型能力编排成可控的业务流程。"},
    {name: "API 网关", level: "深入掌握", details: "掌握鉴权、配额、熔断、审计和可观测性设计，能够统一管理多模型、多租户的访问策略。"},
  ],
};

export const projects: Project[] = [
  {name:"Sub2API",summary:"多模型 API 代理与配额管理平台",description:"把多家模型服务统一成清晰、可观测、可扩展的接口，降低团队接入 AI 的成本。",status:"online",tags:["AI 基础设施","API 网关"],stack:["Go","Redis","Docker","Nginx"],url:"https://sub2api.yangzx1.xyz",repository:"https://github.com/yanlong832-source",accent:"mint",metrics:[{label:"可用性",value:"99.98%"},{label:"响应",value:"42ms"}]},
];
