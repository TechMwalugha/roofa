export const bottomBarContent = [
    {
        h1: 'About Roofa',
        links: [
            {
                name: 'About us',
                url: "/docs/how-we-work"
            }, 
            { 
                name: 'Booking',
                url: "/"
            }, 
            { 
                name: 'Contact Us', 
                url: ''
            }, 
            {
                name: 'Help Center',
                url: ''
            },
        ]
    },
    {
        h1: 'EARN WITH ROOFA',
        links: [
            {
                name: 'Deals',
                url: "/"
            },
            {
                name: 'Refer',
                url: '/'
            }, 
            {
                name: 'investors',
                url: '/',
            },
            {
                name: 'Advertise',
                url: '/'
            },
        ]
    },
    {
        h1: 'Connect with Roofa',
        links: [
            {
                name: 'Invite Friends',
                url: "/"
            },
            {
                name: 'Facebook',
                url: "/",
            },
            {
                name: 'Twitter',
                url: "/"
            },
            {
                name: 'Instagram',
                url: "/"
            },
        ]
    }
]

export const asideBarContent = [
    {
        title: 'Dashboard',
        icon: 'RxDashboard',
        route: '/admin/dashboard'
    },
    {
        title: 'Users',
        icon: 'FaUsers',
        route: '/admin/users'
    },
    {
        title: 'Rentals',
        icon: 'BsFillHousesFill',
        route: '/admin/rentals'
    },
    {
        title: 'Bookings',
        icon: 'RiPassPendingLine',
        route: '/admin/bookings'
    },
    {
        title: 'Notifications',
        icon: 'IoNotifications',
        route: '/admin/notifications'
    },
    {
        title: 'Payments',
        icon: 'MdOutlinePayments',
        route: '/admin/payments'
    },
    {
        title: 'Logout',
        icon: 'BiLogOut',
        route: '/api/auth/signout'
    },
]

export const usersTableHeaders = [
    "",
    "Name",
    "email",
    "Account Status",
    "Updated At",
    "Action"
]

