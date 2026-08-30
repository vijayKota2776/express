const supabase=require('../config/db');

class User{

    static async findByUsername(username){
        const{data,error}=await supabase
        .from('users')
        .select('*')
        .eq('username',username)
        .single();;
        if(error){
            return null;
        }
        return data;
    }

    static async findByEmail(email){
        const{data,error}=await supabase
        .from('users')
        .select('*')
        .eq('email',email)
        .single();
        if(error){
           return null;
        }
        return data;
    }

    static async create(user){
        const{data,error}=await supabase
        .from('users')
        .insert(user)
        .select('*')
        .single();
        if(error){
            return null;
        }
        return data;
    }



};
module.exports=User;