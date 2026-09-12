import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useThemeMode } from '../context'

export function PaginationCustom({ count, page, onChange }) {
	const { isDark } = useThemeMode()

	return (
		<Stack spacing={2} sx={{ alignItems: 'center', padding: '1rem' }}>
			<Pagination
				count={count}
				page={page}
				onChange={onChange}
				sx={{
					'& .MuiPaginationItem-root': {
						fontSize: '1.2rem',
						color: isDark ? '#e6e6e6' : undefined,
					},
				}}
			/>
		</Stack>
	)
}
