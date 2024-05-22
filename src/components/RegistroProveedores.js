import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistroProveedores.css'; 

const RegistroProveedores = () => {
    const [formData, setFormData] = useState({
        personeriaJuridica: '',
        nit: '',
        razonSocial: '',
        representanteLegal: '',
        telefonoContacto: '',
        emailContacto: '',
        ciudadId: '',
        departamentoId: '',
        paisId: '',
        direccion: '',
        rutFile: null
    });

    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
        axios.get('/api/paises').then(response => setPaises(response.data));
        axios.get('/api/departamentos').then(response => setDepartamentos(response.data));
        axios.get('/api/ciudades').then(response => setCiudades(response.data));
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, rutFile: e.target.files[0] });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        axios.post('/api/proveedores', formDataToSend)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(error => {
                console.error(error);
                
            });
    };

    return (
        <div className="form-container"> {}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="personeriaJuridica">Personería Jurídica</label>
                    <select name="personeriaJuridica" id="personeriaJuridica" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="natural">Natural</option>
                        <option value="juridica">Jurídica</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="nit">NIT</label>
                    <input type="text" name="nit" id="nit" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="razonSocial">Nombre de la razón social</label>
                    <input type="text" name="razonSocial" id="razonSocial" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="representanteLegal">Nombre del representante legal</label>
                    <input type="text" name="representanteLegal" id="representanteLegal" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefonoContacto">Teléfono de contacto</label>
                    <input type="text" name="telefonoContacto" id="telefonoContacto" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="emailContacto">Email de contacto</label>
                    <input type="email" name="emailContacto" id="emailContacto" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="paisId">País</label>
                    <select name="paisId" id="paisId" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        {paises.map(pais => (
                            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="departamentoId">Departamento</label>
                    <select name="departamentoId" id="departamentoId" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        {departamentos.map(departamento => (
                            <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ciudadId">Ciudad</label>
                    <select name="ciudadId" id="ciudadId" onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        {ciudades.map(ciudad => (
                            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" name="direccion" id="direccion" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="rutFile">RUT (PDF)</label>
                    <input type="file" name="rutFile" id="rutFile" accept="application/pdf" onChange={handleFileChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegistroProveedores;