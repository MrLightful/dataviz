import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class DatabaseConfig {
  @Value('DB_FILE_NAME')
  fileName: string;
}
