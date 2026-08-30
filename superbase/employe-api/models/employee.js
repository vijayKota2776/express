const supabase = require('../config/db');

class Employee {
  // 🔹 Get all employees
  static async findAll() {
    const { data, error } = await supabase
      .from('employee') // ✅ match your table name
      .select('*');

    if (error) {
      console.error('Supabase findAll error:', error);
      throw new Error('Error fetching employees');
    }
    return data;
  }

  // 🔹 Get one employee by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('employee')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase findById error:', error);
      throw new Error('Error fetching employee by ID');
    }
    return data;
  }

  // 🔹 Create a new employee
  static async create(employee) {
    // Remove createdAt if user sends it manually
    if (employee.createdAt) {
      delete employee.createdAt;
    }

    const { data, error } = await supabase
      .from('employee') // ✅ correct table name
      .insert([employee])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error('Error creating employee');
    }
    return data;
  }

  // 🔹 Update employee by ID
  static async findByIdAndUpdate(id, employee) {
    const { data, error } = await supabase
      .from('employee')
      .update(employee)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error('Error updating employee');
    }
    return data;
  }

  // 🔹 Delete employee by ID
  static async findByIdAndDelete(id) {
    const { data, error } = await supabase
      .from('employee')
      .delete()
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error('Error deleting employee');
    }
    return data;
  }
}

module.exports = Employee;