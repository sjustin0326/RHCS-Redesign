import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; //to convert md to html

const contentDirectory = path.join(process.cwd(), 'src/content/tree-tours');

export function getVisitorInfo() {
    const fullPath = path.join(contentDirectory, 'visitor-information.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        title: data.title as string,
        htmlContent: marked.parse(content) as string,
    }
}

export function getDirections() {
    const fullPath = path.join (contentDirectory, 'directions.md');
    const fileContents = fs.readFileSync (fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
        title: data.title as string,
        htmlContent: marked.parse(content) as string,
    }

}

export function getMaps(){
    const fullPath = path.join (contentDirectory, 'maps.md');
    const fileContents = fs.readFileSync (fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
        title: data.title as string,
        htmlContent: marked.parse(content) as string
    }
}