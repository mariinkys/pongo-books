import axios from 'axios'

export async function getUserId(): Promise<number> {
   let userId = -1

   await axios.get('/api/token')
      .then(res => {
         if (res.status === 200) {
            userId = res.data.sub
         }
      })
   return userId
}