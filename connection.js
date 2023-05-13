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
    .insert(
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

const select_all_data_name = async () => {
  let { data, error } = await supabase
    .from(table_name)
    .select('name')

  if (error) {
    console.error(error)
  }
  if (data) {
    return data
  }
}
const select_all_data_id = async () => {
  let { data, error } = await supabase
    .from(table_name)
    .select('id')

  if (error) {
    console.error(error)
  }
  if (data) {
    return data
  }
}

const delete_country = async (country_id) => {
  const { error } = await supabase
    .from(table_name)
    .delete()
    .eq('id', country_id)
  if (error) {
    console.error(error)
  }
}
const main = async () => {
  await insert_default_data()
  const names = await select_all_data_name()
  names.forEach(name => console.log(name))
  const ids = await select_all_data_id()
  for (let i = 0; i < ids.length; i += 1) {
    console.log(`deleting id ${ids[i].id}`)
    await delete_country(ids[i].id)
  }
}

main().then().catch(console.error)
