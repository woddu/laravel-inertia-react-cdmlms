<?php

use App\Http\Controllers\AccomplishreportController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SubjectController;
use App\Models\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/test', function () {
//     return Inertia::render('Tests', [

//     ]);
// });

Route::redirect('/', '/login', 301);

Route::middleware('auth')->group(function () {
    Route::get('unverified', function () {
        return Inertia::render('Unverified');
    })->name('unverified faculty');
});

Route::middleware(['faculty', 'auth'])->group(function () {

    // Route::get('/dashboard', function () {
    //     return Inertia::render('Faculty/Dashboard');
    // })->name('dashboard');

    Route::get('/subjects/{search}', [SubjectController::class, 'search'])->name('subjects.search');
    Route::patch('/subjects/assign', [SubjectController::class, 'assign'])->name('subjects.assign');
    Route::resource('subjects', SubjectController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('accomplishmentreports', AccomplishreportController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::get('/announcements', [AnnouncementController::class, 'view'])->name('announcements');

    Route::get('schedules', [ScheduleController::class, 'pickSubjects'])->name('schedules');
    Route::get('schedules/{subject}', [ScheduleController::class, 'mySchedule'])->name('schedules.subject');

    Route::get('/classrecord', [FileController::class, 'classRecord'])->name('classrecord');

    Route::get('/gradesheet', [FileController::class, 'gradeSheet'])->name('gradesheet');

    Route::get('/syllabus', [FileController::class, 'syllabus'])->name('syllabus');

    Route::resource('file', FileController::class)
        ->only(['store', 'update', 'destroy']);

    // Route::resource('onlineexam', ExamController::class)
    //     ->only(['index', 'store', 'update', 'destroy']);

    Route::get('/attendance', function () {
        return Inertia::render('Faculty/Attendance', []);
    })->name('attendance');

    Route::get('/onlineclass', function () {
        return Inertia::render('Faculty/OnlineClass', []);
    })->name('onlineclass');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('admin')->group(function () {

        // Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        Route::get('/admin/instructors', [AdminController::class, 'instructors'])->name('admin.instructors');
        Route::get('/admin/instructors/view/{instructor}', [AdminController::class, 'viewInstructor'])->name('admin.instructors.view');
        Route::get('/admin/instructors/{search}', [AdminController::class, 'searchInstructor'])->name('admin.instructors.search');
        Route::patch('/admin/instructors', [AdminController::class, 'verify'])->name('admin.verify');

        Route::get('/admin/subjects', [AdminController::class, 'subjects'])->name('admin.subjects');
        Route::get('/admin/subjects/{search}', [AdminController::class, 'searchSubject'])->name('admin.subjects.search');

        Route::resource('/admin/announcements', AnnouncementController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::get('/admin/repositoryoffiles', [FileController::class, 'allClassRecord'])->name('admin.repositoryoffiles');
        Route::get('/admin/repositoryoffiles/classrecord', [FileController::class, 'allClassRecord'])->name('admin.repositoryoffiles.classrecord');
        Route::get('/admin/repositoryoffiles/gradesheet', [FileController::class, 'allGradeSheet'])->name('admin.repositoryoffiles.gradesheet');
        Route::get('/admin/repositoryoffiles/syllabus', [FileController::class, 'allSyllabus'])->name('admin.repositoryoffiles.syllabus');
        Route::get('/admin/repositoryoffiles/download/{file}', [FileController::class, 'download'])->name('admin.download');


        Route::get('/admin/schedules/{subject}', [ScheduleController::class, 'scheduleOf'])->name('schedules.view');
        Route::resource('/admin/schedules', ScheduleController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });
});




require __DIR__ . '/auth.php';
