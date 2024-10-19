import supabase from "@/utils/supabase";

const Logout = async() => {
    const {error} = await supabase.auth.signOut();

    if (error) {
        console.error("Error signing out:", error);
        return;
    }
    window.location.href = '/login';

}

export default Logout;