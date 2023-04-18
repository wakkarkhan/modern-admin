export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'Assignment 02',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'property',
      displayName: 'Property Management',
      meta: {
        icon: 'vuestic-iconset-maps',
      },
      children: [
        {
          name: 'buildings',
          displayName: 'Buildings',
        },
      ],
    },
  ] as INavigationRoute[],
}
