package com.example.oblig2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;


@Repository
public class billettRepository {

    @Autowired
    private JdbcTemplate db;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void lagreBillett(billettLagring billett) {
        String sql = "INSERT INTO billett (filmer, antallBiletter, fornNavn, etterNavn, telefonNr, epost) VALUES(?, ?, ?, ?, ?, ?)";
        db.update(sql, billett.getFilmer(), billett.getAntallBiletter(), billett.getFornNavn(), billett.getEtterNavn(), billett.getTelefonNr(), billett.getEpost());
    }
    public List<billettLagring> hentAlleBilletter() {
        String sql = "SELECT * FROM billett ORDER BY etterNavn ASC";
        return db.query(sql, new BeanPropertyRowMapper<>(billettLagring.class));
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM billett";
        db.update(sql);
    }
    public void slettBillett(Integer id) {
        String sql = "DELETE FROM billett WHERE id=?";
        db.update(sql, id);
    }
       public billettLagring hentEnBillett(Integer id) {
            String sql = "SELECT * FROM billett WHERE id=?";
            return db.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(billettLagring.class));
        }

    public void oppdaterBillett(billettLagring oppdatertBillett) {
        String sql = "UPDATE billett SET filmer = ?, antallBiletter = ?, fornNavn = ?, etterNavn = ?, telefonNr = ?, epost = ? WHERE id = ?";
        db.update(sql, oppdatertBillett.getFilmer(), oppdatertBillett.getAntallBiletter(), oppdatertBillett.getFornNavn(), oppdatertBillett.getEtterNavn(), oppdatertBillett.getTelefonNr(), oppdatertBillett.getEpost(), oppdatertBillett.getId()); }
}
