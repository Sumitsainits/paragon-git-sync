import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemsTable1710093149474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'groceryItemId',
            type: 'uuid',
          },
          {
            name: 'orderId',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'totalPrice',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_order_items_grocery_item_id',
        columnNames: ['groceryItemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'grocery_items',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_order_items_order_id',
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'order_items',
      'FK_order_items_grocery_item_id',
    );
    await queryRunner.dropForeignKey('order_items', 'FK_order_items_order_id');

    await queryRunner.dropTable('order_items');
  }
}
