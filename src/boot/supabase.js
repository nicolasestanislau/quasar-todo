import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/useAuthUser";

const supabaseUrl = "https://lvjanwevybrdrnsjbzeq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2amFud2V2eWJyZHJuc2piemVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMDA4NjMsImV4cCI6MTk2Nzg3Njg2M30.wjTwDvBtJzyZjFrmElBEwLsL6OkPnza0YjYjTKpTEa4";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null
});
export default function useSupabase() {
  return { supabase };
}
