export const HamburgerIcon = ({ width = 24, height = 24, ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='currentColor'
			viewBox='0 0 24 24'
			{...rest}>
			<path d='M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z'></path>
		</svg>
	)
}
