<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    // Dipanggil saat membuka /home (Tombol Identitas)
    public function index()
    {
        return "Nama: Rizki Agung Pratama | NIM: 7020230057";
    }

    // Dipanggil saat membuka /home/info (Tombol Info Aplikasi)
    public function show($id)
    {
        return "Tema Project: Project Nipos";
    }
}