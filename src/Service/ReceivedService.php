<?php 

namespace App\Service;

use Mpdf\Mpdf;

class ReceivedService
{

    private $pdfGenerator;

    public function __construct()
    {
        $this->pdfGenerator= new Mpdf();
    }

    public function showPdfFile($template)
    {
        $this->pdfGenerator->WriteHTML($template);
        $this->pdfGenerator->Output();
    }

}