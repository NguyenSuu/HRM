export interface RoutesInfo {
    path: string,
    title: string,
    icon: string,
    selected: boolean,
    disabled: boolean,
}

export const ROUTESINFO: RoutesInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: 'home',
        selected: false,
        disabled: false,
    },

    {
        path: '/infomation',
        title: 'Infomation',
        icon: 'solution',
        selected: false,
        disabled: false,
    },
    {
        path: '/employees',
        title: 'Employees',
        icon: 'team',
        selected: false,
        disabled: false,
    },
    {
        path: '/projects',
        title: 'Projects',
        icon: 'profile',
        selected: false,
        disabled: false,
    },
    {
        path: '/vacations',
        title: 'Vacations',
        icon: 'dashboard',
        selected: false,
        disabled: false,
    },
    {
        path: '/reports',
        title: 'Reports',
        icon: 'file-unknown',
        selected: false,
        disabled: false,
    },
    {
        path: '/master',
        title: 'Master',
        icon: 'setting',
        selected: false,
        disabled: false,
    },

]