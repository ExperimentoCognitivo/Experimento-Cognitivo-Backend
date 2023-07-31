import { ConnectionType } from '@Shared/domain/connection-type';
import { EntityManager, getManager, ObjectType } from 'typeorm';
import { throw404 } from "@Errors/error.helper";

export const getResource = async <E extends {}>(entityClass: ObjectType<E>, options: {}, ignoreNotFound?: boolean): Promise<E> => {
    const entityManager: EntityManager = getManager(ConnectionType.MONGO_DB_CONNECTION);
    const resource = await entityManager.findOne(entityClass, options);
    if (!ignoreNotFound) {
        throw404(resource, `Resource can't be found with options: ${JSON.stringify(options)}`);
    }
    return resource as E;
};

export const count = async <E extends {}>(entityClass: ObjectType<E>, options: {}): Promise<number> => {
    const entityManager: EntityManager = getManager(ConnectionType.MONGO_DB_CONNECTION);
    const [result, count] = await entityManager.findAndCount(entityClass, options);
    return count;
};

export const getAll = async <E extends {}>(entityClass: ObjectType<E>, options: {}): Promise<E[]> => {
    const entityManager: EntityManager = getManager(ConnectionType.MONGO_DB_CONNECTION);
    return await entityManager.find(entityClass, options);
};

export const saveResource = async <E extends {}>(entity: E): Promise<E> => {
    const entityManager: EntityManager = await getManager(ConnectionType.MONGO_DB_CONNECTION);
    const resource = await entityManager.save(entity);
    return resource as E;
};
