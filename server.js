/* eslint-disable no-undef */
const app=require('./src/app')

require('dotenv').config()

 const PORT = process.env.PORT || 3000;
//  app.listen(3000,()=>{
//     console.log('Server is running on port 3000')

//  })


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

