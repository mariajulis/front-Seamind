import React from "react";
import PropTypes from 'prop-types';
import { RatingStars } from './RatingStars';

export const PsycologistProfile = ({
    photo,
    nome,
    specialty,
    bio,
    rating,
    contactInfo
}) => {
    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto space-y-4">
            {/* Foto e nome */}
            <div className="flex items-center gap-4">
                <img src={photo} alt={nome} className="w-20 rounded-full object-cover" />
                <div>
                    <h2 className="text-2xl font-bold">{nome}</h2>
                    <p className="text-gray-600">{specialty}</p>
                    <RatingStars rating={rating} />
                </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700">{bio}</p>

            {/* Contato */}
            {contactInfo && (
                <div className="text-gray-600 space-y-1">
                    {contactInfo.email && <p>Email: {contactInfo.email}</p>}
                    {contactInfo.phone && <p>Telefone: {contactInfo.phone}</p>}
                </div>
            )}
        </div>
    );
};

// ==== PropTypes ====
PsychologistProfile.propTypes = {
    photo: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    bio: PropTypes.string,
    rating: PropTypes.number,
    contactInfo: PropTypes.shape({
        email: PropTypes.string,
        phone: PropTypes.stringF
    })
};

// ==== Valores padrão ====
PsychologistProfile.defaultProps = {
    bio: 'Sem descrição disponível',
    rating: 0,
    contactInfo: {}
};

import React from "react";
import PropTypes from "prop-types";

export const RatingStars = ({ rating }) => {
    // Gera um array de 5 elementos e marca as estrelas preenchidas
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? "★" : "☆"
    );

    return (
        <div className="text-yellow-500 text-xl">
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

RatingStars.propTypes = {
    rating: PropTypes.number, // número de estrelas (0 a 5)
};

RatingStars.defaultProps = {
    rating: 0,
};
