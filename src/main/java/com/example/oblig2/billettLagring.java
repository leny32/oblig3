package com.example.oblig2;

public class billettLagring {
    private Integer id;
    private String filmer;
    private String antallBiletter;
    private String fornNavn;
    private String etterNavn;
    private String telefonNr;
    private String epost;

    public billettLagring() {
    }

    public billettLagring(String filmer, String antallBiletter, String fornNavn, String etterNavn, String telefonNr, String epost, Integer id) {
        this.id = id;
        this.filmer = filmer;
        this.antallBiletter = antallBiletter;
        this.fornNavn = fornNavn;
        this.etterNavn = etterNavn;
        this.telefonNr = telefonNr;
        this.epost = epost;
    }

    public String getFilmer() {
        return filmer;
    }

    public String getAntallBiletter() {
        return antallBiletter;
    }


    public String getFornNavn() {
        return fornNavn;
    }

    public String getEtterNavn() {
        return etterNavn;
    }

    public String getTelefonNr() {
        return telefonNr;
    }

    public String getEpost() {
        return epost;
    }

    public int getId() {
        return id;
    }
}
