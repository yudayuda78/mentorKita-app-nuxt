export default defineEventHandler(async (event) => {
    const {title, email} = await readBody(event)

    if(!title){
        return {
            status: 400,
            message: 'Title is required',
            data: null
        }
    }

    if(!email){
        return {
            status: 400,
            message: 'Email is required',
            data: null
        }
    }   

    const save = await prisma.downloadSoalUser.create({
        data: {
            downloadSoalTitle: title,
            email: email,
        }
    })

    return {
        status: 200,
        message: 'Success',
        data: save
    }
})