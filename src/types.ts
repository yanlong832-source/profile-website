export type Project={name:string;summary:string;description:string;status:"online"|"building"|"archived";tags:string[];stack:string[];url?:string;repository?:string;image?:string;accent:string;metrics:Array<{label:string;value:string}>};
export type Issue={number:number;title:string;body:string;labels:string[];created_at:string;updated_at:string;html_url:string};
