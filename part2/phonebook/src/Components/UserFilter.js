import React from 'react'

const UserFilter = ({filterValue, handleFilter}) => (
	<div>
		Filter by name: <input value={filterValue} onChange={handleFilter} />
	</div>
)


export default UserFilter