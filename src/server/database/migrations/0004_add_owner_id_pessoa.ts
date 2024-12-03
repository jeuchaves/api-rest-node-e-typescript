import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex.schema
        .table(ETableNames.pessoa, (table) => {
            table.string('owner_id').notNullable().index();
            table.comment(
                'Tabela usada para armazenar pessoas do sistema, com o campo owner_id para verificar a propriedade'
            );
        })
        .then(() => {
            console.log(
                `# Altered table ${ETableNames.pessoa}: Added owner_id`
            );
        });
}

export async function down(knex: Knex) {
    return knex.schema
        .table(ETableNames.pessoa, (table) => {
            table.dropColumn('owner_id');
        })
        .then(() => {
            console.log(
                `# Altered table ${ETableNames.pessoa}: Dropped owner_id`
            );
        });
}
