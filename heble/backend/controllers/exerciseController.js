const { 
    Users, 
    Exercises, 
    Achievements, 
    UserAchievements
} = require('../models');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercises.findAll();
        res.status(200).json({
            message: 'All exercises fetched successfully.',
            üzenet: 'Az összes gyakorlat sikeresen lekérve.',
            data: exercises
        });
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({
            message: 'Failed to fetch exercises.',
            üzenet: 'Hiba merült fel a gyakorlatok lekérése közben.'
        });
    }
};

const getUserExercises = async (req, res) => {
    const userId = req.params.id;

    try {
        const exercises = await Exercises.findAll({ where: { userId } });
        if (exercises.length === 0) {
            return res.status(404).json({
                message: 'No exercises found for this user.',
                üzenet: 'Nincsenek gyakorlatok ehhez a felhasználóhoz.'
            });
        }
        res.status(200).json({
            message: 'User exercises fetched successfully.',
            üzenet: 'A felhasználó gyakorlatai sikeresen lekérve.',
            data: exercises
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching exercises.',
            üzenet: 'Hiba történt a gyakorlatok lekérése közben.'
        });
    }
};

const logExercise = async (req, res) => {
    const { userId, pushUps, pullUps, squats, running } = req.body;

    if (!userId || 
        (pushUps === undefined && pullUps === undefined && squats === undefined && running === undefined)) {
        return res.status(400).json({
            message: 'Invalid input data.',
            üzenet: 'Nem megfelelő bemenő adat.'
        });
    }

    try {
        const exercise = await Exercises.findOne({ where: { userId } });

        if (!exercise) {
            return res.status(404).json({
                message: 'Exercise record not found for the user.',
                üzenet: 'A felhasználóhoz tartozó gyakorlat nem található.'
            });
        }

        if (typeof pushUps === 'number') exercise.pushUps += pushUps;
        if (typeof pullUps === 'number') exercise.pullUps += pullUps;
        if (typeof squats === 'number') exercise.squats += squats;
        if (typeof running === 'number') exercise.running += running;

        await exercise.save();

        res.status(200).json({
            message: 'Exercise updated successfully.',
            üzenet: 'Gyakorlat sikeresen frissítve.',
            data: exercise
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while logging the exercise.',
            üzenet: 'Hiba történt a gyakorlat rögzítése közben.'
        });
    }
};

const getExerciseByUserID = async (req, res) => {
    const userId = req.params.userId;

    try {
        const exercise = await Exercises.findOne({ where: { userId: userId } });
        if (!exercise) {
            return res.status(404).json({
                message: 'Exercises not found for this user.',
                üzenet: 'A felhasználóhoz nem találhatóak gyakorlatok.'
            });
        }
        res.status(200).json({
            message: 'Exercise data fetched successfully for the user.',
            üzenet: 'A felhasználó gyakorlatai sikeresen lekérve.',
            data: exercise
        });
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({
            message: 'Failed to fetch exercise.',
            üzenet: 'Hiba merült fel a gyakorlatok lekérése közben.'
        });
    }
};

module.exports = {
    getAllExercises,
    getUserExercises,
    logExercise,
    getExerciseByUserID
};
