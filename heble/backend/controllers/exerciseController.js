const Exercises = require('../models/Exercise');
const Users = require('../models/User');

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

module.exports = {
    getUserExercises,
    logExercise
};
