import { DatabaseService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { Taxonomy, taxonomyDb } from './app.entity';
import { and, like, notLike, sql } from 'drizzle-orm';

export interface TreeNode {
  name: string;
  size: number;
  children: TreeNode[];
}

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
  getPath(path?: string): Promise<Taxonomy[]> {
    return this.databaseService.db
      .select()
      .from(taxonomyDb)
      .where(
        path
          ? and(
              like(taxonomyDb.name, `${path} > %`),
              notLike(taxonomyDb.name, `${path} > % > %`),
            )
          : notLike(taxonomyDb.name, '% > %'),
      );
  }

  getFlatDepth(depth: number = 1): Promise<Taxonomy[]> {
    if (depth < 0) {
      return this.databaseService.db.select().from(taxonomyDb);
    }
    // Queries db by depth: name - separtor <= depth * 3 (to include spaces around >).
    return this.databaseService.db
      .select()
      .from(taxonomyDb)
      .where(
        sql`(LENGTH(${taxonomyDb.name}) - LENGTH(REPLACE(${taxonomyDb.name}, ' > ', ''))) <= ${depth * 3}`,
      );
  }

  async getTree(depth: number = 1): Promise<TreeNode> {
    const flatData = await this.getFlatDepth(depth);

    const root: TreeNode = {
      name: 'Root',
      size: 0,
      children: [],
    };

    flatData.forEach((item) => {
      const parts = item.name.split(' > ');
      let currentNode = root;

      let currentPath = '';

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath = currentPath ? `${currentPath} > ${part}` : part;

        let childNode = currentNode.children.find(
          (child) => child.name === part,
        );

        if (!childNode) {
          childNode = {
            name: part,
            size: i === parts.length - 1 ? item.size : 0,
            children: [],
          };
          currentNode.children.push(childNode);
        } else if (i === parts.length - 1) {
          childNode.size = item.size;
        }

        currentNode = childNode;
      }
    });

    return root.children.length === 1 ? root.children[0] : root;
  }
}
