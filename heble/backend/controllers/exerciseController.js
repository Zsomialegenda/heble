const { Users, Exercises, Achievements, UserAchievements } = require('../models');

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
        res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching exercises.',
            üzenet: 'Hiba történt a gyakorlatok lekérése közben.'
        });
    }
};

const logExercise = async (req, res) => {
    const userId = req.body.userId;
    const { pushUps, pullUps, squats, running } = req.body;

    if (!userId || (typeof pushUps !== 'number' && typeof pullUps !== 'number' && typeof squats !== 'number' && typeof running !== 'number')) {
        return res.status(400).json({
            message: 'Invalid input data.',
            üzenet: 'Nem megfelelő bemenő adat.'
        });
    }

    try {
        const [exercise, created] = await Exercises.findOrCreate({
            where: { userId },
            defaults: { pushUps, pullUps, squats, running }
        });

        if (!created) {
            // Update the existing record
            exercise.pushUps += pushUps;
            exercise.pullUps += pullUps;
            exercise.squats += squats;
            exercise.running += running;
            await exercise.save();
        }

        res.status(200).json({
            message: created ? 'New exercise entry created.' : 'Exercise updated.',
            üzenet: created ? 'Új gyakorlat rögzítve.' : 'Gyakorlat frissítve.',
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

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercises.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({
            message: 'Failed to fetch exercises.',
            üzenet: 'Hiba merült fel a gyakorlatok lekérése közben.'
        });
    }
};

const getExerciseByUserID = async (req, res) => {
    const userId = req.params.userId;

    try {
        const exercise = await Exercises.findOne({ where: { user_id: userId } });
        if (!exercise) {
            return res.status(404).json({
                message: 'Exercises not found for this user.',
                üzenet: 'A felhasználóhoz nem találhatóak gyakorlatok.'
            });
        }
        res.status(200).json(exercise);
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({
            message: 'Failed to fetch exercise.',
            üzenet: 'Hiba merült fel a gyakorlatok lekérése közben.'
        });
    }
};

const addExercise = async (req, res) => {
    const { user_id, pushUps, pullUps, squats, running } = req.body;

    try {
        const newExercise = await Exercises.create({
            user_id,
            pushUps,
            pullUps,
            squats,
            running
        });
        res.status(201).json({
            message: 'Exercise added successfully.',
            exercise: newExercise
        });
    } catch (error) {
        console.error('Error adding exercise:', error);
        res.status(500).json({
            message: 'Failed to add exercise.',
            üzenet: 'Hiba merült fel a gyakorlat hozzáadása közben.'
        });
    }
};

module.exports = {
    getAllExercises,
    getUserExercises,
    logExercise,
    getExerciseByUserID,
    addExercise
};
