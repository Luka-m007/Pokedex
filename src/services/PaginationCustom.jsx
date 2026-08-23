import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export function PaginationCustom({ count, page, onChange }) {
	return (
		<Stack spacing={2} sx={{ alignItems: 'center', padding: '1rem' }}>
			<Pagination
				count={count}
				page={page}
				onChange={onChange}
				sx={{
					'& .MuiPaginationItem-root': {
						fontSize: '1.2rem',
					},
				}}
			/>
		</Stack>
	)
}
