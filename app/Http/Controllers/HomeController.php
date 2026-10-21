<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    // Dipanggil saat membuka /home (Tombol Identitas)
    public function index()
    {
        return "Nama: Tresna Alam Nugraha | NIM: 7020230079";
    }

    // Dipanggil saat membuka /home/info (Tombol Info Aplikasi)
    public function show($id)
    {
        return "Tema Project: Project Mistilteinn";
    }
}
