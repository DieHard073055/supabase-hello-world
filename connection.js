const { createClient } = require('@supabase/supabase-js')

require('dotenv').config()
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
const table_name = "countries"
const insert_default_data = async () => {
  const { data, error } = await supabase
    .from(table_name)
    .upsert(
      [
        { name: "UK" },
        { name: "US" },
        { name: "Africa" },
        { name: "Mexico" },
        { name: "Hungaria" },
        { name: "Zimbabwe" },
        { name: "Norway" },
      ])
  if (error) {
    console.error(error)
  }
  if (data) {
    console.log(data)
  }
}

const select_all_data = async () => {
  let { data, error } = await supabase
    .from('countries')
    .select('name')

  if (error) {
    console.error(error)
  }
  if (data) {
    console.log(data)
  }
}
const main = async () => {
  await select_all_data()
}

main().then(console.log).catch(console.error)
