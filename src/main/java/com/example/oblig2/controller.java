package com.example.oblig2;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class controller {

    @Autowired
    billettRepository rep;

    @Autowired
    private JdbcTemplate db;



    @PostMapping("/lagre")
    public void save(billettLagring billett) {
        rep.lagreBillett(billett);
    }
    @GetMapping("/hentBilletter")
    public List<billettLagring> getBillettListe() {
        return rep.hentAlleBilletter();
    }

    @PostMapping ("/slettAlt")
    public void slettArray(){
        rep.slettAlleBilletter();
    }

    @PostMapping ("/slettBilett")
    public void slettBilett(Integer id){
        rep.slettBillett(id);
    }
    @GetMapping("/hentEnBillett")
    public billettLagring hentEnBillett(Integer id){
       return rep.hentEnBillett(id);
    }

    @PostMapping("/oppdaterBillett")
    public void oppdaterBillett(@RequestBody billettLagring oppdatertBillett){
        rep.oppdaterBillett(oppdatertBillett);
    }

}
