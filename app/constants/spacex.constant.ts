import { Routes } from '../enums/spacex.enum';

export const LAUNCH_STATUS = ['All', 'Success', 'Failure', 'Upcoming'];

export const APP_ROUTES = [
    {
        label: 'Launches',
        path: Routes.Launches,
    },
    {
        label: 'Favorites',
        path: Routes.Favorites,
    },
];