import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'member',
		label: 'สมาชิก',
		path: '/member',
		icon: <HiOutlineUsers />
		// icon: <HiOutlineShoppingCart />
	},
	{
		key: 'products',
		label: 'รายการหนังสือ',
		path: '/products',
		icon: <HiOutlineCube />
	},
	// {
	// 	key: 'member',
	// 	label: 'สมาชิก',
	// 	path: '/member',
	// 	icon: <HiOutlineUsers />
	// 	// icon: <HiOutlineShoppingCart />
	// },
	// {
	// 	key: 'addproducts',
	// 	label: 'Add Product',
	// 	path: '/add-product',
	// 	icon: <HiOutlineCube />
	// },
	{
		key: 'Category',
		label: 'หมวดหมู่',
		path: '/category',
		icon: <HiOutlineCube />
	},


	{
		key: 'Starborrower',
		label: 'ยืมหนังสือ',
		path: '/Starborrower',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'returnbook',
		label: 'คืนหนังสือ',
		path: '/returnbook',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'showbookborrow',
		label: 'รายการหนังสือยืม',
		path: '/showbookborrow',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'transactions',
		label: 'Transactions ยืม ',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'transactions',
		label: 'Transactions คืนหนังสือ ',
		path: '/transactionreturn',
		icon: <HiOutlineDocumentText />
	},
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]
