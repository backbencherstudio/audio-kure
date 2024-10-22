
const AllUsers = () => {

    // const { data } = authApi.useGetALlUserQuery()

    // console.log(data?.data);


    return (
        <div className='text-black'>
            <h2>this is all user route</h2>

            {/* <div className='mt-10'>
                {
                    data?.data?.map(item => <div key={item._id}>
                        <h2>{item.name}</h2>
                    </div>)
                }
            </div> */}
        </div>
    );
};

export default AllUsers;