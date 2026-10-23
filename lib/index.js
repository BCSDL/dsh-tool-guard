import z from '@deepseek-ai/schemastery';import {readFileSync} from 'node:fs';import {fileURLToPath} from 'node:url';
import {applyToolDiscipline} from './tool-discipline.js';
export const name='tool-guard';export const inject=['tools','systemPrompt'];
export const Config=z.object({maxEvidenceRetries:z.number().min(0).max(3).default(2)});
export function apply(ctx,config){
 applyToolDiscipline(ctx,config);
 ctx.inject(['skills'],scope=>{for(const skillName of ['local-tools','review-agent']){const path=fileURLToPath(new URL(`../skills/${skillName}/SKILL.md`,import.meta.url));const content=readFileSync(path,'utf8').replace(/^---[\s\S]*?---\s*/,'');scope.effect(()=>scope.skills.register({name:skillName,description:skillName==='review-agent'?'Review source changes for actionable defects.':'Use installed tools with verified arguments and source evidence.',source:'bundled',path,content,resourceBase:{kind:'directory',path:fileURLToPath(new URL(`../skills/${skillName}/`,import.meta.url))}}),skillName);}});
}
