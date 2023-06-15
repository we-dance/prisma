import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({ 
      global:{
        label: 'block mb-1 font-bold text-sm',
        outer:'my-5',
        message: 'text-red-500 mb-1 text-sm',
        messages: 'list-none p-0 mt-1 mb-0',
      },
      text:{
        input:'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline', 
      }, 
      textarea: {
        input:'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline', 
      }, 
      date: {
        input:'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline', 
      }, 
      submit:{
        input:'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      }
    })
  }
}