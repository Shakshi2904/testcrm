// models/partModel.js
const  pool  = require("../db");

exports.getCities = async () => {
    const citiesQuery = "SELECT DISTINCT location_name FROM locations ORDER BY location_name ASC";
    const citiesResult = await pool.query(citiesQuery);
    
    // Ensure result.rows is returned as an array
    return citiesResult;  // Will return rows as an array
};

exports.getAddressesByCity = async (city) => {
    const addressesQuery = "SELECT id, address FROM locations WHERE location_name = $1 ORDER BY address ASC";
    const addressesResult = await pool.query(addressesQuery, [city]);
    
    // Ensure result.rows is returned as an array
    return addressesResult;  // Will return rows as an array
};

exports.getMachinesByAddress = async (addressId) => {
    const machinesQuery = `
        SELECT m.id AS machine_id, m.status, m.last_service_date, m.next_service_due, 
               m.refiller_id, refiller.name AS refiller_name, refiller.email AS refiller_email, refiller.phone_number AS refiller_phn,
               m.buyer_id, buyer.name AS buyer_name, buyer.email AS buyer_email, buyer.phone_number AS buyer_phn
        FROM machines m
        LEFT JOIN users refiller ON m.refiller_id = refiller.id
        LEFT JOIN users buyer ON m.buyer_id = buyer.id
        WHERE m.location_id = $1;
    `;
    const machinesResult = await pool.query(machinesQuery, [addressId]);
    
    // Ensure result.rows is returned as an array
    return machinesResult;  // Will return rows as an array
};

exports.getPartsByMachineAndUser = async (machineId, userId) => {
    const partsQuery = `
        SELECT mp.part_name, mp.price, up.quantity
        FROM machine_parts mp
        JOIN user_purchases up ON up.machine_part_id = mp.id
        WHERE up.machine_id = $1 AND up.user_id = $2;
    `;
    const partsResult = await pool.query(partsQuery, [machineId, userId]);
    
    // Ensure result.rows is returned as an array
    return partsResult;  // Will return rows as an array
};
