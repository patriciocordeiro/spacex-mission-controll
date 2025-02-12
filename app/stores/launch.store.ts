import { action, makeObservable, observable } from 'mobx';
import { ProcessStatus } from '../enums/spacex.enum';
import {
    ApiRequest,
    GetManyOptions,
    Launch,
    Options,
    SpaceXData,
} from '../models/spacex.model';
import { getMany, list } from '../services/api.service';

interface LaunchStoreState {
    status: ProcessStatus;
    error: string;
}

const initialState: LaunchStoreState = {
    status: ProcessStatus.IDLE,
    error: '',
};

class LaunchStore {
    LIMIT = 30;
    localStorageKeys = {
        favorites: 'favorites',
    };
    spaceXData: SpaceXData | null = null;
    itemList: Launch[] = [];
    favoriteItemList: Launch[] = [];
    selectedItem: Launch | null = null;
    status: ProcessStatus = initialState.status;
    error: string = initialState.error;
    lastQuery: ApiRequest['query'] = {};

    constructor() {
        makeObservable(this, {
            itemList: observable,
            selectedItem: observable,
            status: observable,
            error: observable,
            favoriteItemList: observable,
            spaceXData: observable,
            getFavoriteIds: action,
            listFavoriteItems: action,
            listItems: action,
            setSpaceXData: action,
            listMany: action,
            searchItems: action,
            setItemList: action,
            setFavoriteItemList: action,
            toggleFavorite: action,
            fetchNextPage: action,
        });
    }

    listItems = async ({ query, options }: ApiRequest): Promise<void> => {
        this.status = ProcessStatus.LOADING;
        options = {
            ...options,
            limit: this.LIMIT,
        };

        this.setLastQuery(query);

        try {
            const result = await list<SpaceXData>({ query, options });
            this.status = ProcessStatus.SUCCESS;
            this.setItemList(result.docs);
            this.setSpaceXData(result);
        } catch (error) {
            this.status = ProcessStatus.ERROR;
            this.error = (error as Error).message;
        }
    };

    listMany = async ({
        ids,
        options,
    }: GetManyOptions): Promise<SpaceXData | Error> => {
        this.status = ProcessStatus.LOADING;
        try {
            const result = await getMany<SpaceXData>({ ids, options });
            this.status = ProcessStatus.SUCCESS;
            return result;
        } catch (error) {
            this.status = ProcessStatus.ERROR;
            this.error = (error as Error).message;
            return error as Error;
        }
    };

    listFavoriteItems = async ({
        sort = { flight_number: 'desc' },
        populate = ['launchpad', 'rocket'],
        page = 1,
        limit = this.LIMIT,
    }: Options) => {
        const favoriteIds = this.getFavoriteIds();
        if (!favoriteIds.length) return;

        try {
            const result = await this.listMany({
                ids: favoriteIds,
                options: {
                    populate,
                    sort,
                    page,
                    limit,
                },
            });

            if (result instanceof Error) {
                this.error = result.message;
                return [];
            } else {
                console.log(result.docs);
                this.setFavoriteItemList(result.docs);
                return result.docs;
            }
        } catch (error) {
            this.error = (error as Error).message;
        }
    };

    fetchNextPage = async (): Promise<void> => {
        if (!this.spaceXData?.hasNextPage) return;
        const { nextPage } = this.spaceXData;
        if (nextPage) {
            this.status = ProcessStatus.LOADING;
            try {
                const result = await list<SpaceXData>({
                    query: this.lastQuery,
                    options: {
                        page: nextPage,
                        limit: this.LIMIT,
                    },
                });
                this.status = ProcessStatus.SUCCESS;

                const newItems = result.docs.filter(
                    (newItem) => !this.itemList.some((existingItem) => existingItem.id === newItem.id)
                );

                this.setItemList([...this.itemList, ...newItems]);
                this.setSpaceXData(result);
            } catch (error) {
                this.status = ProcessStatus.ERROR;
                this.error = (error as Error).message;
            }
        }
    };

    searchItems = async ({
        searchTerm = '',
        populate = ['launchpad', 'rocket'],
        sort = { flight_number: 'desc' },
        page = 1,
    }: Options): Promise<void> => {
        this.status = ProcessStatus.LOADING;

        const query = {
            $text: { $search: searchTerm },
        };

        this.setLastQuery(query);

        try {
            const result = await list<SpaceXData>({
                query,
                options: {
                    populate,
                    sort,
                    page,
                },
            });
            this.status = ProcessStatus.SUCCESS;
            this.setItemList(result.docs);
        } catch (error) {
            this.status = ProcessStatus.ERROR;
            this.error = (error as Error).message;
        }
    };

    toggleFavorite = (launch: Launch): void => {
        const index = this.favoriteItemList.findIndex(
            (item) => item.id === launch.id
        );
        const favoriteItemList = [...this.favoriteItemList];
        if (index === -1) {
            favoriteItemList.push(launch);
        } else {
            favoriteItemList.splice(index, 1);
        }

        this.setFavoriteItemList(favoriteItemList);

        localStorage.setItem(
            this.localStorageKeys.favorites,
            JSON.stringify(this.getFavoriteIds())
        );
    };

    getFavoriteIds = (): string[] => {
        if (this.favoriteItemList.length > 0) {
            return this.favoriteItemList.map((item) => item.id);
        }
        const storedFavorites = localStorage.getItem(
            this.localStorageKeys.favorites
        );
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    setItemList = (items: Launch[]): void => {
        this.itemList = items;
    };

    setFavoriteItemList = (items: Launch[]): void => {
        this.favoriteItemList = items;
    };

    setSpaceXData = (data: SpaceXData): void => {
        this.spaceXData = data;
    };

    setLastQuery = (query: ApiRequest['query']): void => {
        this.lastQuery = query;
    };
}

export default LaunchStore;
